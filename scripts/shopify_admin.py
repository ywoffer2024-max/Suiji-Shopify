#!/usr/bin/env python3
"""Shopify Admin API helper for SUIJI automation.

Mints a client-credentials access token (cached in /tmp, auto-renewed)
from .admin-credentials and exposes graphql(query, variables).
Uses curl for HTTPS (system trust store; python.org builds lack certs).
"""
import json
import os
import subprocess
import time

STORE = "z0w5mn-29.myshopify.com"
API_VERSION = "2026-01"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = "/tmp/suiji-admin-token.json"


def _post(url, payload, headers):
    cmd = ["curl", "-sS", "-X", "POST", url, "--max-time", "60"]
    for k, v in headers.items():
        cmd += ["-H", f"{k}: {v}"]
    cmd += ["--data-binary", "@-"]
    out = subprocess.run(
        cmd, input=json.dumps(payload).encode(), capture_output=True, check=True
    )
    return json.loads(out.stdout)


def _creds():
    creds = {}
    with open(os.path.join(ROOT, ".admin-credentials")) as f:
        for line in f:
            if "=" in line:
                k, v = line.strip().split("=", 1)
                creds[k] = v
    return creds


def token():
    try:
        c = json.load(open(CACHE))
        if c["exp"] > time.time() + 300:
            return c["t"]
    except Exception:
        pass
    cr = _creds()
    d = _post(
        f"https://{STORE}/admin/oauth/access_token",
        {
            "client_id": cr["CLIENT_ID"],
            "client_secret": cr["CLIENT_SECRET"],
            "grant_type": "client_credentials",
        },
        {"Content-Type": "application/json"},
    )
    if "access_token" not in d:
        raise SystemExit("Token mint failed: " + json.dumps(d))
    json.dump({"t": d["access_token"], "exp": time.time() + d["expires_in"]}, open(CACHE, "w"))
    os.chmod(CACHE, 0o600)
    return d["access_token"]


def graphql(query, variables=None):
    d = _post(
        f"https://{STORE}/admin/api/{API_VERSION}/graphql.json",
        {"query": query, "variables": variables or {}},
        {"Content-Type": "application/json", "X-Shopify-Access-Token": token()},
    )
    if d.get("errors"):
        raise SystemExit("GraphQL errors: " + json.dumps(d["errors"], ensure_ascii=False))
    return d["data"]


if __name__ == "__main__":
    shop = graphql("{ shop { name currencyCode primaryDomain { host } } }")["shop"]
    print(f"Connected: {shop['name']} | {shop['currencyCode']} | {shop['primaryDomain']['host']}")

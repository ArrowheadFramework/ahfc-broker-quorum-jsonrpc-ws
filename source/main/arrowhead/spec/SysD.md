# The Arrowhead Broker (Quorum/JSON-RPC/WS) – Black Box Design

## Abstract

This document provides a description of the _Quorum/JSON-RPC 2.0/Web Service_
variant of the Arrowhead Broker System, an Arrowhead Core Automation Support
System. The system acts as a mediator, allowing consuming systems to access and
use the _Quorum_ distributed ledger as a _trading platform_.

## 1. Overview

The AHF Broker acts on behalf of systems using it. It may or may not
represent its clients using multiple different identities. It is
guaranteed, however, that the same system is always represented by the
same identity, unless the identity is changed by a system administrator
or some other authority.

## 2. Use-Cases

## 3. Behaviour Diagrams

## 4. Application Services

### 4.1. Produced Services

See [`service/`](service/).

### 4.2. Consumed Services

| Service              | IDD Document Reference                                |
|:---------------------|:------------------------------------------------------|
| ServiceDiscovery     | -                                                     |
| Orchestration        | -                                                     |
| AuthorizationControl | -                                                     |

#### 4.2.1. ServiceDiscovery

The service is used to for Broker service registration and for looking up the
address of a running _Orchestration_ service instance. If several
_Orchestration_ instances are available, a random is chosen.

__Configuration__. The address of the _ServiceDiscovery_ service to use _must_
be configured.

### 4.2.2. Orchestration

Used only for determining which _AuthorizationControl_ instance to connect to.

__Conditionally optional__. If the address of an available
_AuthorizationControl_ service is configured, then no _Orchestration_ service
is needed.

### 4.2.3. AuthorizationControl

Used for regulating service access control.

## 5. Security

The Broker system facilitates automation of the process of negotiating
ownership exchanges. To fulfill this role, it must be entrusted with managing
the ownerships of some set of assets. As a consequence of receiving this trust,
a _faulty_ Broker could prevent asset ownership management, while a
_compromised_ Broker could be used to steal assets in a worst-case scenario.

### 5.1. Security Objectives

TODO: Write this section. (STRIDE)

- Integrity of cryptographic keys.
    - Key rot.
    - Key theft.
- System authorization.
    - Key theft.
- Non-repudiation.
    - Token immutability.
    - Exchange immutability.
    - Ownership immutability.
- Tag privacy.

### 5.2. Assets

TODO: Write.

Keys, system identities, ownerships, tokens, exchanges, ...

### 5.3. Non-Technical Sequrity Requirements

## References
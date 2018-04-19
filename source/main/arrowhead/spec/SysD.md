# The Arrowhead Broker (Quorum/JSON-RPC/WS) – Black Box Design

## Abstract

This document provides a description of the _Quorum/JSON-RPC 2.0/Web Service_
variant of the Arrowhead Broker System, an Arrowhead Core Automation Support
System. The system acts as a mediator, allowing consuming services to access and
use the _Quorum_ distributed ledger as a _trading platform_.

## 1. Overview

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

The service is used solely for looking up the address of a running
_Orchestration_ service instance. If several _Orchestration_ instances are
available, a random is chosen.

__Configuration__. The address of the _ServiceDiscovery_ instance to use _must_
be configured, unless the address of either an _Orchestration_ or
_AuthorizationControl_ instance is provided.

### 4.2.2. Orchestration

Used only for determining which _AuthorizationControl_ instance to connect to.

### 4.2.3. AuthorizationControl

Used for regulating service access control.

## 5. Security

### 5.1. Security Objectives

### 5.2. Assets

### 5.3. Non-Technical Sequrity Requirements

## References
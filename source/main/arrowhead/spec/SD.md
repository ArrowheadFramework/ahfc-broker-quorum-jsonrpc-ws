# The Arrowhead Broker – Service Description

## Abstract

This document describes the services exposed by the Arrowhead Broker System.

## 1. Overview

The `Broker` system, illustrated below, facilitates token ownership negotitation, accounting, and tagging.
It acts as a trusted intermediary, allowing its consumers to access an arbitrary _trading platform_, which allows them to exchange `Token`s representing arbitrary value.

![](fig/uml_class_broker.svg)

### 1.1. Brokering Sessions

Whenever a properly authorized Arrowhead system consumes the `Brokering` service produced by a `Broker` system, a persistent session is created or resumed.
Each session is associated with the authenticated identity of its owner, provided via a certificate or otherwise.

#### 1.1.1. Trading Platform Indentity

All brokering sessions contain a _trading platform identity_, which is the identity used to represent the session owner while exchanging tokens. The trading platform identity can be queried via the `BrokerAccounting` service `getAgent` function, and is primarily of use to consuming systems for telling their own activity apart from any other data acquired via the `BrokerAccounting` service.

#### 1.1.2. On-Going Token Exchanges

Each session also holds all relevant state concerning on-going token exchanges, including information about what state notifications each session owner has received.
The `Broker` must try to resend `BrokeringPush` messages being lost due to a session owner being unavailable while any proposal in question remains either acceptable or confirmable.

## 2. Service Interfaces

### 2.1. BrokerAccounting

The `BrokerAccounting` service, depicted below, accounts for past exchange events as well as the identity it uses to represent its consumer.
The services provides no sophisticated analytical capabilities; it serves lists of `Exchange`s, `Ownership`s and `Token`s in response to simpler queries.
If data analysis is desired, the service can provide any data required to any properly authorized analysis service.

![](fig/uml_class_broker_accounting.svg)

#### 2.1.1 Functions

__getAgent__ Gets `Party` object used by the Broker system to represent the system calling this function.

__getExchanges__ Queries for any `Exchange` objects.

__getOwnerships__ Queries for any `Ownership` objects.

__getTokens__ Queries for any `Token` objects.

### 2.2. Brokering

The below depicted `Brokering` service is used by consuming systems to _send_ messages for creating or updating _Exchange State Machines_ (ESMs).
The service is always used together with the `BrokeringPush` service, which is used for _receiving_ ESM updates made by any exchange counter-parties.

![](fig/uml_class_brokering.svg)

#### 2.2.1. Functions

__propose__ Proposes a `Token` exchange.

__accept__ Accepts a _qualified_ `Proposal`, making it pending confirmation.
If the accepted `Proposal` is not qualified, or if its deadline has expired, the call fails.

__reject__ Rejects a _qualified_ `Proposal`.
If the rejected `Proposal` is not qualified, the call fails.

__confirm__ Confirms an accepted `Proposal`, making it binding.
If the confirmed `Proposal` is not qualified and accepted, the call fails.

__abort__ Aborts accepted exchange `Proposal`.
If the aborted `Proposal` is not qualified and accepted, the call fails.

### 2.3. BrokeringPush

Each system consuming the `Brokering` service must also expose a `BrokeringPush` service in order to receive exchange proposals and updates.
If, however, the corresponding `Brokering` implementation exposes its functions through a chat-like protocol, such as XMPP or JSON-RPC, then this service exists only implicitly.
In that case, the same communication channel established by the `Brokering` consumer is used by the `Brokering` service to send the `BrokeringPush` messages.

![](fig/uml_class_brokering_push.svg)

#### 2.3.1. Functions

__propose__ Called to notify about an incoming `Token` exchange `Proposal`.

__accept__ Called to notify about a previously sent `Proposal` being accepted.

__reject__ Called to notify about a previously sent `Proposal` being rejected.

__confirm__ Called to notify about a previously accepted `Proposal` being confirmed.

__abort__ Called to notify about a previously accepted `Proposal` being aborted.

## 3. Information Model

See [`model/`](model/).

## References
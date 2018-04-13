# Arrowhead Broker System (JSON-RPC/WS)

[Arrowhead][arrow] Broker System, useful for allowing IoT devices to use a
_trading platform_, such as a blockchain system, for buying and selling special
_tokens_.

This implementation communicates exclusively using [JSON-RPC 2.0][jsrpc]
messages sent via [WebSocket][webso]s.

_This repository currently contains a work-in-progress._

## About Arrowhead

Arrowhead Framework (AHF) is a service-oriented automation framework, envisioned
to enable the creation of highly dynamic, scalable and resilient industrial
automation systems. It is centered around the idea of so-called
[Local Automation Clouds][clwik], which could be thought of as secured
intranets with real-time operation support. For more information, please refer
to the [Arrowhead Wiki][arwik].

## Significant Source Code Directories

The following is a list of particularily significant source code folders. Any
readers wishing to get a grasp of what this respository contains are adviced to
consider reading source code at the designated locations.

| Directory                             | Description                          |
|:--------------------------------------|:-------------------------------------|
|[`/source/main`][mai]                  | Main source code folder.             |
|[`/source/main/arrowhead`][arr]        | AHF Broker specification.            |
|[`/source/main/arrowhead/model`][amo]  | AHF Broker data model.               |
|[`/source/main/arrowhead/service`][asr]| AHF Broker service interfaces.       |
|[`/source/test`][tst]                  | Test source code folder.             |

[arrow]: http://www.arrowhead.eu/
[arwik]: https://forge.soa4d.org/plugins/mediawiki/wiki/arrowhead-f/index.php/Main_Page
[clwik]: https://forge.soa4d.org/plugins/mediawiki/wiki/arrowhead-f/index.php/Local_automation_clouds
[jsrpc]: http://www.jsonrpc.org/specification
[webso]: https://tools.ietf.org/html/rfc6455

[mai]: source/main
[arr]: source/main/arrowhead
[amo]: source/main/arrowhead/model
[asr]: source/main/arrowhead/service
[tst]: source/test


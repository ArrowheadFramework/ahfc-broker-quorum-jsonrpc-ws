# Arrowhead Broker System (Quorum/JSON-RPC/WS)

[Arrowhead][arrow] Broker System, useful for allowing IoT devices to use the
[Quorum][quoru] distributed ledger as a _exchange network_, allowing them to buy
and sell _tokens_ representing arbitrary value.

This implementation communicates exclusively using [JSON-RPC 2.0][jsrpc]
messages sent via [WebSocket][webso]s.

The official documentation for the system is available in the form of the
Arrowhead Broker [System Description][sysd] and [Service Description][sd]
documents.

[sysd]: https://forge.soa4d.org/plugins/scmgit/cgi-bin/gitweb.cgi?p=arrowhead-f/arrowhead-f.git;a=blob_plain;f=3_Core+Systems/2_Support+Core+Systems/11_Broker+system/Documentation/Arrowhead+SysD+Broker+JSON-RPC_WS.pdf;hb=HEAD
[sd]: https://forge.soa4d.org/plugins/scmgit/cgi-bin/gitweb.cgi?p=arrowhead-f/arrowhead-f.git;a=blob_plain;f=3_Core+Systems/2_Support+Core+Systems/11_Broker+system/Documentation/Arrowhead+SD+Broker.pdf;hb=HEAD

_This repository currently contains a work-in-progress._

## About Arrowhead

Arrowhead Framework (AHF) is a service-oriented automation framework, envisioned
to enable the creation of highly dynamic, scalable and resilient industrial
automation systems. It is centered around the idea of so-called
[Local Automation Clouds][clwik], which could be thought of as secured
intranets with real-time operation support. For more information, please refer
to the [Arrowhead Wiki][arwik].

## Significant Files and Folders

The following is a list of particularily significant source code folders. Any
readers wishing to get a grasp of what this respository contains are adviced to
consider reading source code at the designated locations.

| File Entry                          | Description                            |
|:------------------------------------|:---------------------------------------|
|[`/source/demo`][dem]                | Various demo programs and utilities.   |
|[`/source/main`][mai]                | Main source code folder.               |
|[`/source/main/arrowhead`][sar]      | Arrowhead integration.                 |
|[`/source/main/arrowhead/spec`][sas] | Arrowhead Broker specification.        |
|[`/source/main/quorum`][quo]         | Quorum integration.                    |
|[`/source/test`][tst]                | Test source code folder.               |

[arrow]: http://www.arrowhead.eu/
[arwik]: https://forge.soa4d.org/plugins/mediawiki/wiki/arrowhead-f/index.php/Main_Page
[clwik]: https://forge.soa4d.org/plugins/mediawiki/wiki/arrowhead-f/index.php/Local_automation_clouds
[quoru]: https://www.jpmorgan.com/global/Quorum
[jsrpc]: http://www.jsonrpc.org/specification
[webso]: https://tools.ietf.org/html/rfc6455

[dem]: source/demo
[mai]: source/main
[sar]: source/main/arrowhead
[sas]: source/main/arrowhead/spec
[quo]: source/main/quorum
[tst]: source/test


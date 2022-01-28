## WEBRTC EXPLAINED

- WEBRTC is a package enabled across browsers to establish a real-time, peer to peer, media exchange between two devices without use of a sever(except signaling server).

- Peer to Peer Communication requires following things to be setup :-
    - Agree to begin communication
    - Know how to locate one another
    - bypass security and firewall protections
    - Transmit all multimedia in real time

- Firewalls and NAT device
    - A computer doesn't by default knows it static public IP address
    - This happens because it is sitting behind firewall and NAT devices
    - NAT(network access transaltion) device job is configure your local Ip and generate new public IP that is visible to outside servers.
    - A request to STUN is made to get your public facing IPs
    - This is then send to peer to setup the communication
    - Peer can do the same to get its IP and respond back to peer with Signaling server.
    - STUN (Session Traversal utilities for NAT) and TURN (Travesal using relays around NAT)   
    
- Signalling
    - Allows two endpoints to exchange metadata to coordinate communication in order to setup a call
    - This call and response message flow also called offer and answer message flow contains critical information about two devices about the CODEC informations, type of stream etc
    - All this information is encoded in SDP format (Session description protocol) and transferred upon 
    - Signalling is not specified by WEBRTC Api and is left upon programmer to handle the same.
    - Assuming your system is able to get Response from STUN and have all required details, then with help of signaling information is passed to peer through SDP protocol.

![image](https://whimsical.com/webrtc1-UJksA1DZePiq3QBdFrbEXV)

- Connection Establishment

    - Once answer is received from other peer about inital offer, then
    process occurs to negotiate the best of Interactive Connectivity Establishment Protocol (ICE) candidates gathered by both of peers.
    - ICE candidates guarantees a path between two peers and ensures it's most efficient.
    - Once optimal ICE candidates are choosen,essentially all of the required metadata, network routing information and CODEC for media is agreed upon.
    - Thus a datachannel is created on both endpoints and streams of data can be passed along in bidrectional channel.
    - Connection between two endpoints is full-duplex.
    - If process of agreeing upon ICE candidates fails, then the fallback is to use TURN sever which relays information betweeen peers.

- WEBRTC APIs

    - Media capture and stream - Allows you to get access of input devices
    - RTCPeerConnection - Send stream between endpoints
    - RTCDataChannel 

![image](https://miro.medium.com/max/1400/0*SXRTlnVxy2-hE9ZX)

<!--lint disable no-literal-urls-->
<p align="center">
  <img
      src="https://upload.wikimedia.org/wikipedia/en/thumb/8/80/NFL_Draft_logo.svg/1200px-NFL_Draft_logo.svg.png"
      width="400"
   />
</p>

# Mock Draft Simulator UI <!-- omit in toc -->
## Table of Contents <!-- omit in toc -->
- [Description](#description)
- [Development](#development)

## Description

This project contains the user interface components for the mock draft simulator project. With this project, you're able to run a mock NFL draft as the general manager of a franchise, and select the player you want from the pool of available players.

## Development

To develop the project, you must have the API running on port 3002. It's currently configured hard-coded to point to localhost, but that will change once I have an alpha version of the project and configure DNS in Route53.

Running the developmental server simply requires you to start it with yarn using the following command:
```bash
yarn start
```
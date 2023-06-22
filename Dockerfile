FROM timbru31/ruby-node:2.7-alpine

COPY --from=rust:1.70.0-alpine3.18 / /

ENV RUSTUP_HOME=/usr/local/rustup \
    CARGO_HOME=/usr/local/cargo \
    PATH=/usr/local/cargo/bin:$PATH \
    RUST_VERSION=1.70.0

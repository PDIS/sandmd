# SandMD
[CodiMD/HackMD](https://github.com/hackmdio/codimd) Sandstorm app integration.
This app uses [saml-idp](https://github.com/mcguinness/saml-idp) to link Sandstorm accounts and CodiMD authorization through SAML.

## Install
Download `dist/sandmd.spk`, then upload it to your Sandstorm instance.
I will release to Sandstorm market after some refine.

## Development
If you want to pack your own spk file, create `pgp-keyring` and `pgp-signature` in `.sandstorm/asset` as https://docs.sandstorm.io/en/latest/developing/publishing-apps/, or remove related lines in `sandstorm-pkgdef.capnp`.

### License
SandMD is under AGPL license, inherited from its parent, CodiMD.

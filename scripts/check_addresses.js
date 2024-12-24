const { mnemonicToSeed } = require('bip39');
const { hdkey } = require('ethereumjs-wallet');

async function main() {
  const mnemonic = process.env.MNEMONIC;
  const seed = await mnemonicToSeed(mnemonic);
  const hdwallet = hdkey.fromMasterSeed(seed);
  const path = "m/44'/60'/0'/0/0";
  const wallet = hdwallet.derivePath(path).getWallet();
  const address = wallet.getAddressString();
  console.log(`Derived address: ${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


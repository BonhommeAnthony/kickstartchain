const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");

// Delete the current build folder.
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

/***
 * The recommended way to interface with the Solidity compiler, especially for more
 * complex and automated setups is the so-called JSON-input-output interface.
 *
 * See https://docs.soliditylang.org/en/v0.8.6/using-the-compiler.html#compiler-input-and-output-json-description
 * for more details.
 */
const input = {
  language: "Solidity",
  sources: {
    "Campaign.sol": {
      content: source,
    },
  },
  settings: {
    metadata: {
      useLiteralContent: true,
    },
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contracts = output.contracts["Campaign.sol"];

// Create the build folder.
fs.ensureDirSync(buildPath);

// Extract and write the JSON representations of the contracts to the build folder.
console.log(output);
for (let contract in contracts) {
  if (contracts.hasOwnProperty(contract)) {
    fs.outputJsonSync(
      path.resolve(buildPath, `${contract}.json`),
      contracts[contract]
    );
  }
}

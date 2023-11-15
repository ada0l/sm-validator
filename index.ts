import {
  fromBech32,
  fromHex,
  toBase64,
  toBech32,
  toHex,
  toUtf8,
  toAscii,
  fromBase64,
  fromAscii,
} from "@cosmjs/encoding";
import { createAddress, PubKey, sha256, ripemd160 } from "@tendermint/sig";

const inputData = {
  validator: {
    operator_address: "seivaloper1wwfpmcvehq6yqdxfccs5rdr745q3kmy06l9d0d",
    consensus_pubkey: {
      type_url: "/cosmos.crypto.ed25519.PubKey",
      value: "7uHtOE4oYn6GDGHVjKT7kW00rZ+XzLlcZyB4CpfuEN8=",
    },
    jailed: false,
    status: "BOND_STATUS_BONDED",
    tokens: "336482197906678",
    delegator_shares: "336482197906678000000000000000000",
    description: {
      moniker: "kingnodes 👑",
      identity: "30E6CD38D9721222",
      website: "https://kingnodes.com",
      security_contact: "security@kingnodes.com",
      details:
        "Professional PoS validator securing only the best interchain networks. Join our community of delegators Telegram: https://t.me/kingnodes Twitter: https://twitter.com/kingnodes",
    },
    unbonding_height: "2592000",
    unbonding_time: {
      seconds: "1687587992",
      nanos: 90938670,
    },
    commission: {
      commission_rates: {
        rate: "50000000000000000",
        max_rate: "1000000000000000000",
        max_change_rate: "1000000000000000000",
      },
      update_time: {
        seconds: "1692231987",
        nanos: 873800335,
      },
    },
    min_self_delegation: "1",
  },
};
const exampleOutput = {
  operatorAddress: "seivaloper1wwfpmcvehq6yqdxfccs5rdr745q3kmy06l9d0d",
  hexAddress: "F04B5B9C48B65604A1309E0B0046B4F7CF8C7EF2",
  accountAddress: "sei1wwfpmcvehq6yqdxfccs5rdr745q3kmy0ys5rwa",
  consensusAddress: "seivalcons17p94h8zgketqfgfsnc9sq3457l8cclhjc4x825",
  consensusPubkey: {
    typeUrl: "/cosmos.crypto.ed25519.PubKey",
    value: "7uHtOE4oYn6GDGHVjKT7kW00rZ+XzLlcZyB4CpfuEN8=",
  },
  jailed: false,
  status: "BOND_STATUS_BONDED",
  tokens: 336432417555670,
  delegatorShares: "336432417555670000000000000000000",
  description: {
    moniker: "kingnodes 👑",
    identity: "30E6CD38D9721222",
    details:
      "Professional PoS validator securing only the best interchain networks. Join our community of delegators Telegram: https://t.me/kingnodes Twitter: https://twitter.com/kingnodes",
    website: "https://kingnodes.com",
    avatar:
      "https://s3.amazonaws.com/keybase_processed_uploads/c9fbb1676edede4bf0b3c787aefaa205_360_360.jpg",
    socials: {
      tiwtterUrl: "https://twitter.com/kingnodes",
      githubUrl: "https://github.com/nullmames",
      webUrl: "http://kingnodes.com",
    },
  },
  commission: {
    commissionRates: {
      rate: "50000000000000000",
      maxRate: "1000000000000000000",
      maxChangeRate: "1000000000000000000",
    },
    updateTime: {
      seconds: "1692231987",
      nanos: 873800335,
    },
  },
  cumulativeShare: 0.0598919905107987,
  votingPowerPercent: 0.0598919905107987,
  rank: 1,
};

function proccess(inputData: any) {
  const validator = inputData.validator;
  const ed25519PubkeyRaw = fromBase64(
    inputData.validator.consensus_pubkey.value,
  );

  const addressData = sha256(ed25519PubkeyRaw).slice(0, 20);
  const hexAddress = toHex(addressData).toUpperCase();
  const consensusAddress = toBech32("seivalcons", addressData);

  return {
    operatorAddress: validator.operator_address,
    hexAddress: hexAddress,
    accountAddress: "", // TODO
    consensusAddress: consensusAddress,
    consensusPubkey: {
      typeUrl: validator.consensus_pubkey.type_url,
      value: validator.consensus_pubkey.value,
    },
    jailed: validator.jailed,
    status: validator.status,
    tokens: +validator.tokens,
    delegatorShares: validator.delegator_shares,
    description: {
      moniker: validator.moniker,
      identity: validator.identity,
      details: validator.details,
      website: validator.website,
      avatar:
        "https://s3.amazonaws.com/keybase_processed_uploads/c9fbb1676edede4bf0b3c787aefaa205_360_360.jpg", // ALREADY PREPARED
      socials: {
        tiwtterUrl: "https://twitter.com/kingnodes", // ALREADY PREPARED
        githubUrl: "https://github.com/nullmames", // ALREADY PREPARED
        webUrl: "http://kingnodes.com", // ALREADY PREPARED
      },
    },
    commission: {
      commissionRates: {
        rate: validator.commission.commission_rates,
        maxRate: validator.commission.max_rate,
        maxChangeRate: validator.commission.max_change_rate,
      },
      updateTime: {
        seconds: validator.commission.update_time.seconds,
        nanos: validator.commission.update_time.nanos,
      },
    },
    cumulativeShare: 0.0598919905107987, // TODO
    votingPowerPercent: 0.0598919905107987, // TODO
    rank: 1, //TODO
  };
}

const runAll = async (): Promise<void> => {
  const processedData = proccess(inputData);
  // console.log(processedData);
};

runAll();

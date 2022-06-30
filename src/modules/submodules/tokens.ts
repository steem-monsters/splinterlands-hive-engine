import { AssetSymbol } from '../../types';
import { ContractsApi, ContractsOptions } from '../contracts';

export interface TokenBalance {
    _id: number;
    account: string;
    symbol: string;
    balance: string;
    stake: string;
    pendingUnstake: string;
    delegationsIn: string;
    delegationsOut: string;
    pendingUndelegations: string;
}

export interface TokenDelegation {
    _id: number;
    from: string;
    to: string;
    symbol: string;
    quantity: string;
}

export interface PendingUnstakes {
    _id: number;
    account: string;
    symbol: string;
    quantity: string;
    quantityLeft: string;
    nextTransactionTimestamp: string;
    numberTransactionsLeft: string;
    txID: string;
}

export interface PendingUndelegations {
    account: string;
    symbol: string;
    quantity: string;
    completeTimestamp: string;
    txID: string;
}

export class TokensContractsApi {
    constructor(private readonly contracts: ContractsApi) {}

    public getContract() {
        return this.contracts.getContract('tokens');
    }

    public getAccountBalance(account: string, symbol: AssetSymbol): Promise<TokenBalance> {
        return this.contracts.findOne('tokens', 'balances', { account, symbol });
    }

    public getAccountBalances(account: string, symbols: AssetSymbol[], options?: ContractsOptions): Promise<TokenBalance[]> {
        return this.contracts.find('tokens', 'balances', { account, symbol: { $in: symbols } }, options);
    }

    public getBalances(query: any = {}, options?: ContractsOptions): Promise<TokenBalance[]> {
        return this.contracts.find('tokens', 'balances', query, options);
    }

    public getTokens(options?: ContractsOptions) {
        return this.contracts.find('tokens', 'tokens', {}, options);
    }
}

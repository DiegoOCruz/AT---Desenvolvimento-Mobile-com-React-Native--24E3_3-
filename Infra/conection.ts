import * as Network from 'expo-network';

const verifyConnection = async (): Promise<boolean> => {
    const airplaneMode: boolean = await Network.isAirplaneModeEnabledAsync();
    const network: any = await Network.getNetworkStateAsync();
    const result = network.isConnected && !airplaneMode;

    return result;
}

export default verifyConnection;
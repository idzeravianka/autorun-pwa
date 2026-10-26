import {UssdData} from "@/src/types/interfaces/mqtt-sensors-data-response";

export function shouldRefreshUssdBalance(ussdCache?: UssdData | null): boolean {
    if (!ussdCache || !ussdCache.lastCheckedDate) {
        return true;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    return ussdCache.lastCheckedDate !== todayStr;
}

import {UssdData} from "@/src/types/interfaces/mqtt-sensors-data-response";

export function parseUssdResponse(rawText: string): UssdData {
    const balanceMatch = rawText.match(/Balans=([\d.]+r?)/i);
    const mbMatch = rawText.match(/MB=(\d+)/i);
    const now = new Date();

    return {
        balance: balanceMatch ? balanceMatch[1] : null,
        megabytes: mbMatch ? mbMatch[1] : null,
        raw: rawText,
        updatedAt: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        lastCheckedDate: now.toLocaleDateString('ru-RU'),
        timestamp: now.getTime(),
    };
}

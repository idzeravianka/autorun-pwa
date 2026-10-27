'use client';

import {useEffect, useState} from "react";
import {useSettingsStore} from "../utils/user-settings-store";
import {MqttCommands} from "../types/enums/mqtt-commands";
import {sendCommand} from "../utils/mqtt-client";
import {Box, CircularProgress, IconButton, Typography} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import {shouldRefreshUssdBalance} from "@/src/utils/ussd-balance-hepler";

export function SimBalance() {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const activeCar = useSettingsStore((state) => state.getActiveCar());
    const mqttData = useSettingsStore((state) => state.mqttData);
    const isConnected = useSettingsStore(state => state.mqttStatus === 'connected');

    const ussdData = useSettingsStore((state) =>
        activeCar ? state.getUssdDataForCar(activeCar.id) : null
    );

    const handleManualRefresh = () => {
        if (!activeCar?.topic || isRefreshing) return;

        setIsRefreshing(true);
        sendCommand(activeCar.topic, MqttCommands.Ussd);
    };

    useEffect(() => {
        if (ussdData) {
            setIsRefreshing(false);
        }
    }, [ussdData]);

    useEffect(() => {
        if (activeCar && isConnected && mqttData.pin.length && shouldRefreshUssdBalance(ussdData)) {
            sendCommand(`${activeCar.topic}`, MqttCommands.Ussd);
        }
    }, [activeCar, isConnected, mqttData]);

    if (!activeCar) return null;

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                borderRadius: 4,
                bgcolor: 'plat.card',
                mt: 1,
            }}
        >
            <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                <Box
                    sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '14px',
                        bgcolor: 'plat.bg',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <SignalCellularAltIcon sx={{color: 'plat.brandCobalt', fontSize: 22}}/>
                </Box>

                <Box>
                    <Box sx={{display: 'flex', gap: 0.5}}>
                        <Typography sx={{fontSize: '12px', fontWeight: 700}}>
                            БАЛАНС:
                        </Typography>
                        <Typography sx={{fontSize: '12px', fontWeight: 700}}>
                            {ussdData?.balance ? `${ussdData.balance} руб.` : 'Нет данных'}
                            {ussdData?.megabytes ? ` (${ussdData.megabytes} MB)` : ''}
                        </Typography>
                    </Box>
                    {ussdData?.updatedAt && (
                        <Typography sx={{fontSize: '12px', color: 'plat.textMuted'}}>
                            Проверено {ussdData?.updatedAt} ({ussdData?.lastCheckedDate})
                        </Typography>
                    )}
                </Box>
            </Box>

            <IconButton
                onClick={handleManualRefresh}
                disabled={isRefreshing}
                sx={{
                    color: 'plat.brandCobalt',
                    bgcolor: 'plat.bg',
                    '&:hover': {bgcolor: 'action.hover'}
                }}
                size="small"
            >
                {isRefreshing ? (
                    <CircularProgress size={24} sx={{color: 'plat.brandCobalt'}}/>
                ) : (
                    <RefreshIcon fontSize="small"/>
                )}
            </IconButton>
        </Box>
    );
}

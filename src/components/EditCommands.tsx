'use client';
import {useRouter, useSearchParams} from "next/navigation";
import React, {useEffect, useMemo, useState} from "react";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import PageContainer from "@/src/components/PageContainer";
import {Box, Button, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import {POINT_CUTTING} from "@/src/const/common-sx-styles";
import {MqttCommands} from "@/src/types/enums/mqtt-commands";

const LIST_OF_AVAILABLE_COMMANDS = {
    [MqttCommands.Scenario6]: 'Сценарий 6',
    [MqttCommands.Scenario7]: 'Сценарий 7',
    [MqttCommands.Scenario8]: 'Сценарий 8',
    [MqttCommands.Scenario9]: 'Сценарий 9',
};

export default function EditCommands() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');
    const [startEngineCommand, setStartEngineCommand] = useState<MqttCommands>(MqttCommands.StartEngine);

    const allSettings = useSettingsStore(state => state.settings);
    const addOrUpdate = useSettingsStore(state => state.addOrUpdateConnection);

    const selectedCar = useMemo(() =>
            allSettings.savedEntities.find(c => c.id === id),
        [allSettings, id]);

    useEffect(() => {
        if (selectedCar?.customCommandsToSend?.startEngine) {
            setStartEngineCommand(selectedCar.customCommandsToSend.startEngine);
        }
    }, [selectedCar]);

    if (!selectedCar) {
        return (
            <PageContainer>
                <Typography sx={{ p: 2, textAlign: 'center' }}>
                    Автомобиль не найден
                </Typography>
            </PageContainer>
        );
    }

    const handleSave = () => {
        addOrUpdate({
            ...selectedCar, customCommandsToSend: {
                startEngine: startEngineCommand,
            }
        });
        router.push(`/`);
    };

    const handleStartEngineChange = (change: SelectChangeEvent) => {
        setStartEngineCommand(change.target.value as MqttCommands);
    }

    return (
        <PageContainer>
            <Box sx={{flexGrow: 1, overflow: 'hidden'}}>
                <Typography
                    sx={{
                        fontWeight: 700,
                        fontSize: '14px',
                        color: 'plat.textDark',
                        ...POINT_CUTTING,
                    }}>{selectedCar.name}</Typography>
                <InputLabel sx={{
                    fontSize: '14px',
                    color: 'plat.textDark',
                    ...POINT_CUTTING,
                }}>Старт двигателя</InputLabel>
                <Select
                    fullWidth
                    size='small'
                    value={startEngineCommand}
                    onChange={handleStartEngineChange}
                    sx={{
                        backgroundColor: 'background.paper',
                        marginBottom: '1rem',
                    }}
                >
                    <MenuItem value={MqttCommands.StartEngine}>Сценарий 1 (по умолчанию)</MenuItem>
                    {
                        Object.entries(LIST_OF_AVAILABLE_COMMANDS).map(([command, label]) => (
                            <MenuItem value={command} key={command}>{label}</MenuItem>))
                    }
                </Select>

                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                        borderRadius: 3,
                        textTransform: 'none',
                    }}
                    onClick={handleSave}
                >
                    Сохранить настройки
                </Button>
            </Box>
        </PageContainer>
    )
}

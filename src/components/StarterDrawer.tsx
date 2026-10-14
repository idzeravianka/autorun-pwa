'use client';
import {Box, Button, Drawer, Slider, Typography} from "@mui/material";
import React from "react";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import {sendCommand} from "@/src/utils/mqtt-client";
import {MqttCommands} from "@/src/types/enums/mqtt-commands";

export function StarterDrawer({isOpen, onClose}: { isOpen: boolean, onClose: () => void }) {
    const [starterTimeValue, setStarterTimeValue] = React.useState<number>(2.5);

    const activeCar = useSettingsStore((state) => state.getActiveCar());

    const handleChange = (_: Event, newValue: number) => {
        setStarterTimeValue(newValue);
    };

    const sendTimerValue = () => {
        if (!activeCar) return;
        sendCommand(`${activeCar.topic}`, `${MqttCommands.StarterCrankTime}${starterTimeValue * 1000}`);
        onClose();
    };

    return <Drawer
        anchor="bottom"
        open={isOpen}
        onClose={onClose}
        sx={{'& .MuiDrawer-paper': {borderTopLeftRadius: 16, borderTopRightRadius: 16, p: 2}}}
    >
        <Typography sx={{mb: 1, textAlign: 'center'}}>
            Время прокрутки стартера: {starterTimeValue} сек.
        </Typography>
        <Box sx={{display: 'flex', flexFlow: 'column nowrap', alignItems: 'center', gap: 2}}>
            <Slider
                aria-label="StarterTime"
                valueLabelDisplay="auto"
                step={0.5}
                marks
                min={0.5}
                max={4.5}
                sx={{
                    maxWidth: '80%',
                }}
                value={starterTimeValue}
                onChange={handleChange}
            />

            <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                    borderRadius: 3,
                    textTransform: 'none',
                    mb: 1,
                }}
                onClick={sendTimerValue}
            >
                Установить
            </Button>
        </Box>
    </Drawer>
}

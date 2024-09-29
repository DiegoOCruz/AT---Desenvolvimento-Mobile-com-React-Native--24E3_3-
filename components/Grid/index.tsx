import * as React from 'react';
import { Surface } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

type GridProps = {
    elevation?: number | null;
    styleSurface?: object;
    style?: object;
    children: React.ReactNode;
};

const Grid: React.FC<GridProps> = ({
    elevation = null,
    styleSurface = {},
    style = {},
    children
}) => {
    return elevation ? (
        <Surface
            style={{
                ...styles.surface,
                ...styleSurface
            }}
            elevation={3}
        >
            <View
                style={{
                    width: '100%',
                    ...style
                }}
            >
                {children}
            </View>
        </Surface>
    ) : (
        <View
            style={{
                width: '100%',
                ...style
            }}
        >
            {children}
        </View>
    );
};

export default Grid;

const styles = StyleSheet.create({
    surface: {
        padding: 8,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

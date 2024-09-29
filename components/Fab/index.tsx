import { FAB, Portal, PaperProvider } from 'react-native-paper';
import React from 'react';

const Fab = ({ actions = [], ...props }: any) => {
    return actions.length > 0 ? (
        <PaperProvider>
            <Portal>
                <FAB.Group {...props} />
            </Portal>
        </PaperProvider>
    ) : (
        <FAB {...props} />
    );
};

export default Fab;

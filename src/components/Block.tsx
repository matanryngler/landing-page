import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface BlockProps {
    className?: string;
    children: React.ReactNode;
    whileHover?: any;
}

export const Block: React.FC<BlockProps> = ({ className, children, whileHover }) => {
    return (
        <motion.div
            variants={{
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={whileHover}
            className={cn(
                "card card-hover rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden",
                className
            )}
        >
            {children}
        </motion.div>
    );
};

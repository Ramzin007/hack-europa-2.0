import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { AlertCircle } from 'lucide-react';

interface FloatingLabelInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const FloatingLabelInput = forwardRef<HTMLInputElement, FloatingLabelInputProps>(
    ({ label, error, className, id, required, ...props }, ref) => {
        const defaultId = id || label.toLowerCase().replace(/\s+/g, '-');
        const hasError = Boolean(error);

        return (
            <div className={cn("relative z-0 w-full mb-8 group", className)}>
                <input
                    {...props}
                    id={defaultId}
                    ref={ref}
                    required={required}
                    aria-invalid={hasError ? "true" : "false"}
                    aria-describedby={hasError ? `${defaultId}-error` : undefined}
                    placeholder=" "
                    className={cn(
                        "block py-3 px-4 w-full text-base bg-transparent border-2 appearance-none focus:outline-none focus:ring-0 peer transition-all duration-300 rounded-xl",
                        "text-white border-white/10 glass-card focus:bg-white/5",
                        hasError ? "border-red-500/80 focus:border-red-500" : "focus:border-[var(--neon-purple)] focus:shadow-[0_0_15px_rgba(181,51,255,0.3)]"
                    )}
                />
                <label
                    htmlFor={defaultId}
                    className={cn(
                        "peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-8 scale-75 top-3 left-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 cursor-text",
                        hasError ? "text-red-400 peer-focus:text-red-500" : "text-white/50 peer-focus:text-[var(--neon-purple)]"
                    )}
                >
                    {label} {required && '*'}
                </label>

                {/* Animated Error Message */}
                <AnimatePresence>
                    {hasError && (
                        <motion.p
                            id={`${defaultId}-error`}
                            initial={{ opacity: 0, y: -5, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -5, height: 0 }}
                            className="text-red-500 text-xs mt-1 absolute -bottom-6 left-2 flex items-center gap-1 font-medium"
                        >
                            <AlertCircle size={12} />
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);

FloatingLabelInput.displayName = 'FloatingLabelInput';

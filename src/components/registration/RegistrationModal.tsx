import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';
import { useRegistrationForm } from './useRegistrationForm';
import { FloatingLabelInput } from '../ui/FloatingLabelInput';
import { ChromeButton } from '../ui/ChromeButton';
import { cn } from '../../lib/utils';

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
    const { formData, updateField, errors, touched, isValid, markAllTouched } = useRegistrationForm();
    const formRef = useRef<HTMLFormElement>(null);

    // Lock body scroll and handle Escape key
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
            };
            document.addEventListener('keydown', handleEscape);
            return () => {
                document.body.style.overflow = 'unset';
                document.removeEventListener('keydown', handleEscape);
            };
        }
    }, [isOpen, onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) {
            markAllTouched();
            return;
        }
        // Would submit to API here
        console.log('Submitted successfully:', formData);
        onClose();
    };

    if (!isOpen) return null;

    return createPortal(
        <AnimatePresence>
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            >
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
                    exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    transition={{ duration: 0.4 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 pointer-events-auto"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(181,51,255,0.15)] overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
                >
                    {/* Chrome top border accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--neon-blue)] via-[var(--neon-purple)] to-[var(--neon-magenta)]" />

                    {/* Header */}
                    <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/5 shrink-0">
                        <div>
                            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold chrome-text tracking-tight">
                                SECURE YOUR SPOT
                            </h2>
                            <p className="text-white/50 text-sm mt-1 font-light">
                                Europa awaits. Assemble your elite squad.
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white group z-10"
                            aria-label="Close modal"
                        >
                            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>

                    {/* Form Content - Scrollable */}
                    <div className="p-6 sm:p-8 overflow-y-auto overflow-x-hidden glass-card flex-grow">
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                                <FloatingLabelInput
                                    label="Team Name"
                                    required
                                    value={formData.teamName}
                                    onChange={(e) => updateField('teamName', e.target.value)}
                                    error={touched.teamName ? errors.teamName : undefined}
                                />
                                <FloatingLabelInput
                                    label="Team Leader Name"
                                    required
                                    value={formData.leaderName}
                                    onChange={(e) => updateField('leaderName', e.target.value)}
                                    error={touched.leaderName ? errors.leaderName : undefined}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                                <FloatingLabelInput
                                    label="Contact Email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => updateField('email', e.target.value)}
                                    error={touched.email ? errors.email : undefined}
                                />
                                <FloatingLabelInput
                                    label="Contact Phone"
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => updateField('phone', e.target.value)}
                                    error={touched.phone ? errors.phone : undefined}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                                <FloatingLabelInput
                                    label="Total Participants (1-4)"
                                    type="number"
                                    required
                                    min="1"
                                    max="4"
                                    value={formData.totalParticipants}
                                    onChange={(e) => updateField('totalParticipants', e.target.value)}
                                    error={touched.totalParticipants ? errors.totalParticipants : undefined}
                                />
                                <FloatingLabelInput
                                    label="Female Participants"
                                    type="number"
                                    required
                                    min="1"
                                    max="4"
                                    value={formData.femaleParticipants}
                                    onChange={(e) => updateField('femaleParticipants', e.target.value)}
                                    error={touched.femaleParticipants ? errors.femaleParticipants : undefined}
                                />
                            </div>

                            <div className="relative z-0 w-full mb-8 group">
                                <select
                                    id="foodPreference"
                                    required
                                    value={formData.foodPreference}
                                    onChange={(e) => updateField('foodPreference', e.target.value as any)}
                                    aria-invalid={touched.foodPreference && errors.foodPreference ? "true" : "false"}
                                    className={cn(
                                        "block py-3 px-4 w-full text-base bg-transparent border-2 appearance-none focus:outline-none focus:ring-0 transition-all duration-300 rounded-xl cursor-pointer peer",
                                        "text-white border-white/10 glass-card focus:bg-white/5 hover:bg-white/5",
                                        touched.foodPreference && errors.foodPreference ? "border-red-500/80 focus:border-red-500" : "focus:border-[var(--neon-purple)] focus:shadow-[0_0_15px_rgba(181,51,255,0.3)]",
                                        formData.foodPreference === '' ? 'text-white/50' : 'text-white'
                                    )}
                                >
                                    <option value="" disabled className="bg-[#121216] text-white/50">Select Food Preference *</option>
                                    <option value="Veg" className="bg-[#121216] text-white">Veg</option>
                                    <option value="Non-Veg" className="bg-[#121216] text-white">Non-Veg</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                                {/* Animated Error */}
                                <AnimatePresence>
                                    {touched.foodPreference && errors.foodPreference && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -5, height: 0 }}
                                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                                            exit={{ opacity: 0, y: -5, height: 0 }}
                                            className="text-red-500 text-xs mt-1 absolute -bottom-6 left-2 flex items-center gap-1 font-medium"
                                        >
                                            <AlertCircle size={12} />
                                            {errors.foodPreference}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        </form>
                    </div>

                    {/* Footer CTA */}
                    <div className="p-6 sm:p-8 border-t border-white/5 bg-black/40 shrink-0 flex justify-end">
                        <ChromeButton
                            glowColor="magenta"
                            onClick={handleSubmit}
                            disabled={!isValid}
                            className={cn(
                                "w-full sm:w-auto min-w-[200px] text-center",
                                !isValid && "opacity-50 cursor-not-allowed grayscale-[0.5]"
                            )}
                        >
                            {isValid ? 'CONFIRM' : 'FILL REQUIRED FIELDS'}
                        </ChromeButton>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>,
        document.body
    );
}

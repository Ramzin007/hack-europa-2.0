import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useRegistrationForm } from './useRegistrationForm';
import { FloatingLabelInput } from '../ui/FloatingLabelInput';
import { ChromeButton } from '../ui/ChromeButton';
import { cn } from '../../lib/utils';

interface RegistrationViewProps {
    onBack: () => void;
}

export function RegistrationView({ onBack }: RegistrationViewProps) {
    const { formData, updateField, errors, touched, isValid, markAllTouched } = useRegistrationForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) {
            markAllTouched();
            return;
        }
        console.log('Submitted successfully via Full View:', formData);
        onBack();
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="relative z-20 w-full min-h-screen py-20 px-6 max-w-4xl mx-auto"
        >
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 group"
            >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm tracking-widest uppercase">Back to Terminal</span>
            </button>

            <div className="mb-16">
                <h1 className="text-5xl md:text-7xl font-black chrome-text tracking-tighter mb-4">
                    REGISTRATION
                </h1>
                <p className="text-white/60 text-lg font-light max-w-xl">
                    Complete your application to join the next iteration of HACK EUROPA. Ensure all details are accurate before confirmation.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 glass-card p-8 sm:p-12 rounded-[2rem] border-white/5 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                    <FloatingLabelInput
                        label="Total Participants"
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
                        id="foodPreference-view"
                        required
                        value={formData.foodPreference}
                        onChange={(e) => updateField('foodPreference', e.target.value as any)}
                        className={cn(
                            "block py-4 px-5 w-full text-base bg-transparent border-2 appearance-none focus:outline-none focus:ring-0 transition-all duration-300 rounded-2xl cursor-pointer",
                            "text-white border-white/10 glass-card focus:bg-white/5",
                            touched.foodPreference && errors.foodPreference ? "border-red-500/80" : "focus:border-[var(--neon-purple)]"
                        )}
                    >
                        <option value="" disabled className="bg-[#0a0a0f]">Select Food Preference *</option>
                        <option value="Veg" className="bg-[#0a0a0f]">Veg</option>
                        <option value="Non-Veg" className="bg-[#0a0a0f]">Non-Veg</option>
                    </select>
                    {touched.foodPreference && errors.foodPreference && (
                        <p className="text-red-500 text-xs mt-2 ml-2">{errors.foodPreference}</p>
                    )}
                </div>

                <div className="pt-8">
                    <ChromeButton
                        glowColor="magenta"
                        className="w-full md:w-auto px-16"
                        onClick={handleSubmit}
                        disabled={!isValid}
                    >
                        {isValid ? 'CONFIRM APPLICATION' : 'FILL REQUIRED FIELDS'}
                    </ChromeButton>
                </div>
            </form>
        </motion.div>
    );
}

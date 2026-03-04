import { useState, useMemo } from 'react';

export interface RegistrationFormData {
    teamName: string;
    leaderName: string;
    email: string;
    phone: string;
    totalParticipants: string;
    femaleParticipants: string;
    foodPreference: 'Veg' | 'Non-Veg' | '';
}

export type FormErrors = Partial<Record<keyof RegistrationFormData, string>>;

export function useRegistrationForm() {
    const [formData, setFormData] = useState<RegistrationFormData>({
        teamName: '',
        leaderName: '',
        email: '',
        phone: '',
        totalParticipants: '',
        femaleParticipants: '',
        foodPreference: '',
    });

    const [touched, setTouched] = useState<Partial<Record<keyof RegistrationFormData, boolean>>>({});

    const updateField = (field: keyof RegistrationFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const markAllTouched = () => {
        const allTouched = Object.keys(formData).reduce((acc, key) => {
            acc[key as keyof RegistrationFormData] = true;
            return acc;
        }, {} as typeof touched);
        setTouched(allTouched);
    };

    // 100% strict derived validation based on user requirements
    const errors = useMemo<FormErrors>(() => {
        const newErrors: FormErrors = {};

        if (!formData.teamName.trim()) newErrors.teamName = 'Required';
        if (!formData.leaderName.trim()) newErrors.leaderName = 'Required';
        if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email required';
        if (!formData.phone.trim() || !/^\d{10,}$/.test(formData.phone.replace(/[\s-]/g, ''))) newErrors.phone = 'Valid phone required';

        const total = parseInt(formData.totalParticipants, 10);
        const female = parseInt(formData.femaleParticipants, 10);

        // Total rules (Total > 0, Total <= 4)
        if (isNaN(total) || total <= 0) {
            newErrors.totalParticipants = 'Min 1';
        } else if (total > 4) {
            newErrors.totalParticipants = 'Max 4';
        }

        // Female rules (Female >= 1, Female <= Total)
        if (isNaN(female)) {
            newErrors.femaleParticipants = 'Required';
        } else if (female < 1) {
            newErrors.femaleParticipants = 'Min 1 female participant';
        } else if (!isNaN(total) && female > total) {
            newErrors.femaleParticipants = 'Exceeds total';
        }

        if (!formData.foodPreference) newErrors.foodPreference = 'Required';

        return newErrors;
    }, [formData]);

    const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

    return {
        formData,
        updateField,
        errors,
        touched,
        isValid,
        markAllTouched
    };
}

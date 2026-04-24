// ─── Web3Forms configuration ──────────────────────────────────
// Get your free access key from https://web3forms.com
// Just enter your email — they send the key instantly, no signup needed

export const web3FormsConfig = {
  accessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '',
}

// ─── Contact info cards ───────────────────────────────────────
export const contactInfo = [
  {
    label: 'Email',
    value: 'kohat3067@email.com',
    href:  'mailto:kohat3067@email.com',
    icon:  'email',
  },
  {
    label: 'Location',
    value: 'Rawalpindi, Pakistan',
    href:  null,
    icon:  'location',
  },
  {
    label: 'Availability',
    value: 'Open to opportunities',
    href:  null,
    icon:  'status',
  },
]

// ─── Social links — GitHub and LinkedIn only ──────────────────
export const socialLinks = [
  {
    name:  'GitHub',
    href:  'https://github.com/HAmzaaider',
    label: 'View my code',
  },
  {
    name:  'LinkedIn',
    href:  'https://www.linkedin.com/in/hamza-haider-6b8063318?lipi=urn%3Ali%3Apage%3Ad_flagship3_messaging_conversation_detail%3B2k59jJLRSTiLhf5mnZjcVg%3D%3D',
    label: 'Connect with me',
  },
]
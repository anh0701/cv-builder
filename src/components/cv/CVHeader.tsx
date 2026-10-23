import type { CVData, CVLabels } from '../../types/cv'

interface CVHeaderProps {
    cv: CVData
    labels: CVLabels
    isVi: boolean
}

export default function CVHeader({
    cv,
    labels,
    isVi,
}: CVHeaderProps) {
    const contacts = [
        { label: isVi ? 'Email' : 'Email', value: cv.email },
        { label: isVi ? 'Điện thoại' : 'Phone', value: cv.phone },
        { label: isVi ? 'Địa chỉ' : 'Address', value: cv.address },
    ].filter((item) => item.value?.trim())

    const links = [
        { label: 'LinkedIn', url: cv.linkedin },
        { label: 'GitHub', url: cv.github },
    ].filter((item) => item.url?.trim())

    return (
        <header className="cv-header">
            <h1>
                {cv.fullName || (isVi ? 'Họ và tên' : 'Your Name')}
            </h1>

            {(contacts.length > 0 || links.length > 0) && (
                <div className="cv-contact-group">
                    <p className="cv-contact-label">{labels.contact}</p>

                    <div className="cv-contact-list">
                        {contacts.map((item) => (
                            <div className="cv-contact-item" key={item.label}>
                                <span className="cv-contact-item-label">
                                    {item.label}
                                </span>
                                <span className="cv-contact-item-value">
                                    {item.value}
                                </span>
                            </div>
                        ))}

                        {links.map((item) => (
                            <div className="cv-contact-item" key={item.label}>
                                <span className="cv-contact-item-label">
                                    {item.label}
                                </span>
                                <a
                                    className="cv-contact-item-value"
                                    href={
                                        item.url!.startsWith('http')
                                            ? item.url!
                                            : `https://${item.url}`
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {item.url!.replace(/^https?:\/\//, '')}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </header>
    )
}
import s from "./integrations-ribbon.module.css"

const apps = [
  ["WhatsApp Business", "whatsapp-icon"], ["Gmail", "gmail"],
  ["HubSpot", "hubspot"], ["Google Sheets", "google-sheets"],
  ["Microsoft Teams", "microsoft-teams"], ["Slack", "slack-icon"],
  ["Shopify", "shopify"], ["Google Drive", "google-drive"],
  ["Google Calendar", "google-calendar"], ["Notion", "notion-icon"],
  ["Airtable", "airtable-icon"], ["Trello", "trello"],
  ["Asana", "asana-icon"], ["Zendesk", "zendesk-icon"],
  ["Salesforce", "salesforce"], ["WooCommerce", "woocommerce-icon"],
  ["Telegram", "telegram"], ["Discord", "discord-icon"],
]

export function IntegrationsRibbon() {
  return (
    <section className={s.section} aria-labelledby="integrations-title">
      <header className={s.header}>
        <h2 id="integrations-title" className={s.heading}>
          Connected to the <span className="heading-accent">tools you already use.</span>
        </h2>
      </header>
      <div className={s.viewport}>
        <div className={s.track}>
          {[false, true].map((duplicate) => (
            <ul key={String(duplicate)} className={s.list} aria-label={duplicate ? undefined : "Example apps for integration"} aria-hidden={duplicate || undefined}>
              {apps.map(([name, icon]) => (
                <li className={s.chip} key={name}>
                  {/* Fixed dimensions reserve space before each local SVG loads. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/integration-logos/${icon}.svg`} width={28} height={28} alt="" />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}

import type { ReactNode } from "react"
import {
  ArrowRight,
  Hash,
  CalendarDays,
  Check,
  CircleCheck,
  FileCheck2,
  FileText,
  MapPin,
  MessageSquare,
  Package,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from "lucide-react"
import {
  SiGoogledrive,
  SiNotion,
  SiGmail,
  SiQuickbooks,
  SiShopify,
  SiGooglecalendar,
  SiZendesk,
  SiConfluence,
} from "@icons-pack/react-simple-icons"
import s from "./capabilities.module.css"

export type WorkflowKey = "knowledge" | "invoices" | "booking" | "support"
const tools = {
  Slack: { icon: Hash, color: "#611f69" },
  Drive: { icon: SiGoogledrive, color: "#1b8b48" },
  Notion: { icon: SiNotion, color: "#171717" },
  Gmail: { icon: SiGmail, color: "#d64438" },
  QuickBooks: { icon: SiQuickbooks, color: "#269430" },
  Shopify: { icon: SiShopify, color: "#66992b" },
  Calendar: { icon: SiGooglecalendar, color: "#3378ef" },
  Zendesk: { icon: SiZendesk, color: "#19434a" },
  Confluence: { icon: SiConfluence, color: "#1765d7" },
}
type Tool = keyof typeof tools
function ToolName({ name, detail }: { name: Tool; detail?: string }) {
  const Icon = tools[name].icon
  return (
    <span className={s.toolName}>
      <Icon size={20} color={tools[name].color} aria-hidden="true" />
      <span>
        {name}
        {detail && <small>{detail}</small>}
      </span>
    </span>
  )
}
function MiniCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`${s.miniCard} ${className}`}>{children}</div>
}
function Status({
  children,
  warning = false,
}: {
  children: ReactNode
  warning?: boolean
}) {
  return (
    <div className={`${s.status} ${warning ? s.warning : ""}`}>
      {warning ? (
        <TriangleAlert size={17} aria-hidden="true" />
      ) : (
        <CircleCheck size={17} aria-hidden="true" />
      )}
      <span>{children}</span>
    </div>
  )
}
function Record({
  title,
  detail,
  tool,
  warning = false,
}: {
  title: string
  detail: string
  tool?: Tool
  warning?: boolean
}) {
  const Icon = tool ? tools[tool].icon : FileCheck2
  return (
    <div className={s.record}>
      <span className={s.recordIcon}>
        <Icon
          size={21}
          color={tool ? tools[tool].color : undefined}
          aria-hidden="true"
        />
      </span>
      <div>
        <strong>{title}</strong>
        <span>{detail}</span>
      </div>
      {warning ? (
        <TriangleAlert className={s.amber} size={17} aria-hidden="true" />
      ) : (
        <CircleCheck className={s.green} size={17} aria-hidden="true" />
      )}
    </div>
  )
}
function Stage({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: ReactNode
}) {
  return (
    <div className={s.stage}>
      <div className={s.stageHeading}>
        <span>{number}</span>
        <h4>{title}</h4>
      </div>
      <div className={s.stageBody}>{children}</div>
      {number < 3 && (
        <ArrowRight className={s.connector} size={21} aria-hidden="true" />
      )}
    </div>
  )
}
function Tools({ items }: { items: Tool[] }) {
  return (
    <div className={s.connectedTools}>
      {items.map((name) => (
        <span key={name}>
          <ToolName name={name} />
          <Check size={13} aria-hidden="true" />
        </span>
      ))}
    </div>
  )
}
function Chat({
  children,
  label,
  agent = false,
}: {
  children: ReactNode
  label: string
  agent?: boolean
}) {
  return (
    <div className={`${s.chat} ${agent ? s.agentChat : ""}`}>
      <span className={s.chatLabel}>
        {agent ? (
          <Sparkles size={14} aria-hidden="true" />
        ) : (
          <MessageSquare size={14} aria-hidden="true" />
        )}
        {label}
      </span>
      <p>{children}</p>
    </div>
  )
}

function Knowledge() {
  return (
    <>
      <Stage number={1} title="Employee asks">
        <MiniCard>
          <ToolName name="Slack" detail="Employee enquiry" />
          <Chat label="Employee">
            What approvals do I need to buy software that costs $7,500 and
            stores customer data?
          </Chat>
        </MiniCard>
        <div className={s.neutralNote}>
          <FileText size={16} aria-hidden="true" /> Search approved company
          documents
        </div>
      </Stage>
      <Stage number={2} title="AI checks the sources">
        <Record
          tool="Drive"
          title="Procurement Policy v4.2"
          detail="Section 3.1 · match found"
        />
        <Record
          tool="Notion"
          title="IT Security Standard"
          detail="Section 2.4 · match found"
        />
        <Record
          tool="Confluence"
          title="Vendor Onboarding SOP"
          detail="Step 2 · match found"
        />
        <Status>Three relevant sources found</Status>
      </Stage>
      <Stage number={3} title="Answer with evidence">
        <MiniCard>
          <strong className={s.miniHeading}>Before purchasing</strong>
          <ol className={s.answerList}>
            <li>
              Get manager and Finance approval. <span>[1]</span>
            </li>
            <li>
              Complete an IT Security review. <span>[2]</span>
            </li>
            <li>
              Submit a vendor request before signing. <span>[3]</span>
            </li>
          </ol>
          <div className={s.citations}>
            <span>[1] Procurement Policy, 3.1</span>
            <span>[2] Security Standard, 2.4</span>
            <span>[3] Vendor SOP, Step 2</span>
          </div>
        </MiniCard>
        <Status>Verified against company documents</Status>
      </Stage>
    </>
  )
}
function Invoices() {
  return (
    <>
      <Stage number={1} title="Invoice arrives">
        <MiniCard>
          <ToolName name="Gmail" detail="New invoice email" />
          <div className={s.emailBody}>
            <strong>Apex Office Supply</strong>
            <span>Invoice INV-1048</span>
            <p>Please find the invoice for purchase order PO-2841.</p>
          </div>
        </MiniCard>
        <MiniCard>
          <div className={s.documentTitle}>
            <FileText size={18} aria-hidden="true" /> INV-1048.pdf
          </div>
          <dl className={s.details}>
            <div>
              <dt>Purchase order</dt>
              <dd>PO-2841</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>$4,280.00</dd>
            </div>
          </dl>
        </MiniCard>
        <Status>Document received</Status>
      </Stage>
      <Stage number={2} title="AI validates the details">
        <Record
          title="Extract invoice data"
          detail="Vendor, date, PO number, total"
        />
        <Record
          title="Check calculations & duplicates"
          detail="Totals correct · no duplicate found"
        />
        <Record
          tool="QuickBooks"
          title="Match purchase order"
          detail="PO-2841 found in accounting"
        />
        <Record
          title="Compare approved amount"
          detail="$280 above the purchase order"
          warning
        />
        <Status warning>One exception found</Status>
      </Stage>
      <Stage number={3} title="Record and route for review">
        <MiniCard>
          <ToolName name="QuickBooks" detail="Draft bill saved" />
          <dl className={s.details}>
            <div>
              <dt>Vendor</dt>
              <dd>Apex Office Supply</dd>
            </div>
            <div>
              <dt>Invoice</dt>
              <dd>INV-1048</dd>
            </div>
            <div>
              <dt>Amount</dt>
              <dd>$4,280.00</dd>
            </div>
          </dl>
          <div className={s.paymentNote}>
            <ShieldCheck size={16} aria-hidden="true" /> Payment not approved
          </div>
        </MiniCard>
        <div className={s.exception}>
          <strong>
            <TriangleAlert size={18} aria-hidden="true" /> Finance review needed
          </strong>
          <p>Invoice exceeds the purchase order by $280.</p>
        </div>
        <Tools items={["QuickBooks", "Drive", "Slack"]} />
      </Stage>
    </>
  )
}
function Booking() {
  return (
    <>
      <Stage number={1} title="Customer requests service">
        <Chat label="Customer">
          I need two office air conditioners serviced next Tuesday afternoon.
        </Chat>
        <MiniCard>
          <div className={s.fact}>
            <Package size={17} aria-hidden="true" /> 2 AC units
          </div>
          <div className={s.fact}>
            <MapPin size={17} aria-hidden="true" /> Downtown office
          </div>
          <div className={s.fact}>
            <CalendarDays size={17} aria-hidden="true" /> Tuesday, 1:00–4:00 pm
          </div>
        </MiniCard>
        <Status>Contact details verified</Status>
      </Stage>
      <Stage number={2} title="Find the right technician">
        <MiniCard>
          <div className={s.person}>
            <span>DS</span>
            <div>
              <strong>Daniel Silva</strong>
              <small>Commercial AC technician</small>
            </div>
          </div>
          <ul className={s.checks}>
            <li>
              <Check size={15} aria-hidden="true" /> Right skills
            </li>
            <li>
              <Check size={15} aria-hidden="true" /> Available in your area
            </li>
          </ul>
        </MiniCard>
        <MiniCard>
          <ToolName name="Calendar" detail="Availability checked" />
          <strong className={s.slot}>Tuesday · 2:00–3:30 pm</strong>
        </MiniCard>
        <Status>Visit reserved</Status>
      </Stage>
      <Stage number={3} title="Visit confirmed">
        <MiniCard>
          <span className={s.serviceLabel}>Office AC maintenance</span>
          <dl className={s.details}>
            <div>
              <dt>When</dt>
              <dd>Tuesday at 2:00 pm</dd>
            </div>
            <div>
              <dt>Technician</dt>
              <dd>Daniel Silva</dd>
            </div>
          </dl>
        </MiniCard>
        <Record
          tool="Gmail"
          title="Confirmation sent"
          detail="SMS reminder scheduled"
        />
        <Tools items={["Calendar", "Gmail"]} />
        <Status>Booking and connected records updated</Status>
      </Stage>
    </>
  )
}
function Support() {
  return (
    <>
      <Stage number={1} title="Customer reports a problem">
        <Chat label="Customer">
          My order A4821 was due five days ago, but tracking has not updated.
          Can you check it?
        </Chat>
        <Chat label="AI support" agent>
          I sent a verification code to the email linked to your order.
        </Chat>
        <MiniCard>
          <div className={s.verification} aria-label="Six-digit code verified">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} aria-hidden="true">
                •
              </span>
            ))}
          </div>
        </MiniCard>
        <Status>Identity verified</Status>
      </Stage>
      <Stage number={2} title="AI verifies and checks">
        <Record
          tool="Gmail"
          title="Verify customer"
          detail="Registered email confirmed"
        />
        <Record
          tool="Shopify"
          title="Find order A4821"
          detail="Order and delivery details matched"
        />
        <Record
          title="Check tracking & policy"
          detail="Eligible after 5 days overdue"
        />
        <Record
          title="Check replacement stock"
          detail="Original item is available"
        />
        <Status>Resolution options approved</Status>
      </Stage>
      <Stage number={3} title="Resolve and follow through">
        <Chat label="AI support" agent>
          You can choose a free replacement or a full refund.
        </Chat>
        <MiniCard>
          <strong className={s.miniHeading}>Customer’s choice</strong>
          <p className={s.selection}>Please send a replacement.</p>
        </MiniCard>
        <Tools items={["Shopify", "Zendesk", "Gmail"]} />
        <Status>Replacement confirmed</Status>
      </Stage>
    </>
  )
}
export function WorkflowExample({ example }: { example: WorkflowKey }) {
  return (
    <div className={s.workflow}>
      {example === "knowledge" ? (
        <Knowledge />
      ) : example === "invoices" ? (
        <Invoices />
      ) : example === "booking" ? (
        <Booking />
      ) : (
        <Support />
      )}
    </div>
  )
}

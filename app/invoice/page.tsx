import { getLedgerItemWithNames } from "../lib/data";

export default function Page() {
    getLedgerItemWithNames(1);
    return <div>Ledger management stuff here</div>;
}

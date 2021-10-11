import { Node } from "./thedata";
import { Page } from "./page";

export interface Appointments {
    nodes: Node[],
    page: Page,
    __typename: string
}

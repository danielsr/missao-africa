import { PersonController } from "./controller/PersonController";

export const Routes = [{
    method: "get",
    route: "/persons",
    controller: PersonController,
    action: "all"
}, {
    method: "get",
    route: "/persons/:id",
    controller: PersonController,
    action: "one"
}, {
    method: "post",
    route: "/persons",
    controller: PersonController,
    action: "save"
}, {
    method: "delete",
    route: "/persons/:id",
    controller: PersonController,
    action: "remove"
}];
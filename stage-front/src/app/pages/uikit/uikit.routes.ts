import { Routes } from '@angular/router';
import { ButtonDemo } from './buttondemo';
import { ChartDemo } from './chartdemo';
import { FileDemo } from './filedemo';
import { FormLayoutDemo } from './formlayoutdemo';
import { InputDemo } from './inputdemo';
import { ListDemo } from './listdemo';
import { MediaDemo } from './mediademo';
import { MessagesDemo } from './messagesdemo';
import { MiscDemo } from './miscdemo';
import { PanelsDemo } from './panelsdemo';
import { TimelineDemo } from './timelinedemo';
import { TableDemo } from './tabledemo';
import { OverlayDemo } from './overlaydemo';
import { TreeDemo } from './treedemo';
import { MenuDemo } from './menudemo';
import {Dashboard} from "../dashboard/dashboard";

import {ProductComponent} from "./product/product.component";
import {WarehouseComponent} from "./warehouse/warehouse.component";
import {OrderesclientComponent} from "./orderesclient/orderesclient.component";
import {OrderchatbotComponent} from "./orderesclient/orderchatbot/orderchatbot.component";
import {TestComponent} from "./test/test.component";
import {CsvvalidatorComponent} from "./csvvalidator/csvvalidator.component";
import {ManageuserComponent} from "../user/manageuser/manageuser.component";

export default [
    { path: 'button', data: { breadcrumb: 'Button' }, component: ButtonDemo },
    { path: 'charts', data: { breadcrumb: 'Charts' }, component: ChartDemo },
    { path: 'file', data: { breadcrumb: 'File' }, component: FileDemo },
    { path: 'formlayout', data: { breadcrumb: 'Form Layout' }, component: FormLayoutDemo },
    { path: 'input', data: { breadcrumb: 'Input' }, component: InputDemo },
    { path: 'list', data: { breadcrumb: 'List' }, component: ListDemo },
    { path: 'media', data: { breadcrumb: 'Media' }, component: MediaDemo },
    { path: 'message', data: { breadcrumb: 'Message' }, component: MessagesDemo },
    { path: 'misc', data: { breadcrumb: 'Misc' }, component: MiscDemo },
    { path: 'panel', data: { breadcrumb: 'Panel' }, component: PanelsDemo },
    { path: 'timeline', data: { breadcrumb: 'Timeline' }, component: TimelineDemo },
    { path: 'table', data: { breadcrumb: 'Table' }, component: TableDemo },
    { path: 'overlay', data: { breadcrumb: 'Overlay' }, component: OverlayDemo },
    { path: 'tree', data: { breadcrumb: 'Tree' }, component: TreeDemo },
    { path: 'menu', data: { breadcrumb: 'Menu' }, component: MenuDemo },
    { path: 'dash', data: { breadcrumb: 'Menu' }, component: Dashboard},
    { path: 'product', component: ProductComponent},
    { path: 'warehouse', component: WarehouseComponent},
    { path: 'test',  component: TestComponent},
    { path: 'chatorder', component: OrderchatbotComponent},
    { path: 'csv', component: CsvvalidatorComponent},
    { path: 'manageusers', component: ManageuserComponent},
    { path: '**', redirectTo: '/notfound' }
] as Routes;

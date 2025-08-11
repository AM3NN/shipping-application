import { TestBed } from '@angular/core/testing';

import { OrderechatbotService } from './orderchatbot/orderechatbot.service';

describe('OrderechatbotService', () => {
  let service: OrderechatbotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderechatbotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

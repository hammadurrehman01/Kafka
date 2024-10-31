import EventEmitter from 'events';

export const EVENT_TYPES = {
  SEND_EMAIL: 'SEND_EMAIL',
};

class Emitter extends EventEmitter {
  register(handlers: { event: string; handler: (...args: any[]) => void }[]) {
    handlers.map(i => this.on(i.event, i.handler));
  }
}

export const Events = new Emitter();

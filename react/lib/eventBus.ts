import mitt from 'mitt';

type Events = {
    notify: {
        color: string;
        title: string;
        description: string;
        icon: React.ReactNode;
    };
    event: {
        color: string;
        title: string;
        description: string;
        icon: React.ReactNode;
    };
};

const emitter = mitt<Events>();
export default emitter;

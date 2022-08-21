import fetchMock from 'fetch-mock';

const todosMock = [
    { id: 1, name: 'walk with dog' },
    { id: 2, name: 'read book' },
    { id: 3, name: 'make dinner' },
];
const wrongWords = ['smoke', 'drink'];

// todos
fetchMock.get('api/todos', todosMock);
fetchMock.post(
    'api/todos',
    async (_, res) => {
        const isWrong = wrongWords.includes(res.body);
        if (isWrong) {
            return { throws: new TypeError('Wrong todo') };
        }
        todosMock.push({ id: new Date().getTime(), name: res.body });
        return 200;
    },
    {
        delay: 1000, // fake a slow network
    },
);

// todo
fetchMock.get('express:/api/todos/:id', (url) => {
    const id = url.split('/').pop();

    return todosMock.find((item) => +item.id === +id);
});
fetchMock.put(
    'api/todos',
    async (_, res) => {
        const isWrong = wrongWords.includes(res.body);
        if (isWrong) {
            return { throws: new TypeError('Wrong todo') };
        }

        const { name, id } = res.body;
        todosMock.forEach((todo) => {
            if (+todo.id === +id) todo.name = name;
        });
        return res.body;
    },
    {
        delay: 1000, // fake a slow network
    },
);

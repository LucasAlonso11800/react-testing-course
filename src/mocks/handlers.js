import { rest } from 'msw';

export const handlers = [
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
        return res(
            ctx.json([
                { name: 'Chocolate', imagePath: '' },
                { name: 'Vanilla', imagePath: '' }
            ])
        );
    }),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
        return res(
            ctx.json([
                { name: 'Cherries', imagePath: '' },
                { name: 'M&Ms', imagePath: '' },
                { name: 'Hot fudge', imagePath: '' }
            ])
        );
    })
];
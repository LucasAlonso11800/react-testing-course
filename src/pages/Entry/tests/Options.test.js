import { render, screen } from '../../../testUtils/testingUtils';
import Options from '../Options';

describe('Options', () => {
    test('Displays image for each scoop option from server', async () => {
        render(<Options optionType="scoops" />);

        const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
        expect(scoopImages).toHaveLength(2);

        const altText = scoopImages.map(element => element.alt);
        expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
    });

    test('Displays image for each topping option from server', async () => {
        render(<Options optionType="toppings" />)

        const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });
        expect(toppingImages).toHaveLength(3);

        const altText = toppingImages.map(element => element.alt);
        expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);    
    });
});
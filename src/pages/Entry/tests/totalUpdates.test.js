import { render, screen } from '../../../testUtils/testingUtils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

describe('Totals', () => {
    test('Update scoop subtotal when scoops change', async () => {
        render(<Options optionType="scoops" />);

        const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
        expect(scoopsSubtotal).toHaveTextContent('0.00');

        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1');
        expect(scoopsSubtotal).toHaveTextContent('2.00');

        const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
        userEvent.clear(chocolateInput);
        userEvent.type(chocolateInput, '2');
        expect(scoopsSubtotal).toHaveTextContent('6.00');
    });

    test('Update toppings subtotal when toppings change', async () => {
        render(<Options optionType="toppings" />);

        const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });
        expect(toppingsSubtotal).toHaveTextContent('0.00');

        const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
        const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: 'Hot fudge' });

        userEvent.click(cherriesCheckbox);
        expect(toppingsSubtotal).toHaveTextContent('1.50');

        userEvent.click(hotFudgeCheckbox);
        expect(toppingsSubtotal).toHaveTextContent('3.00');

        userEvent.click(cherriesCheckbox);
        expect(toppingsSubtotal).toHaveTextContent('1.50');
    });

    test('Grand total updates', async () => {
        render(<OrderEntry />);

        const total = await screen.findByRole('heading', { name: /grand total: \$/i });
        expect(total).toHaveTextContent('0.00');

        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1');
        expect(total).toHaveTextContent('2.00');

        const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
        userEvent.click(cherriesCheckbox);
        expect(total).toHaveTextContent('3.50');
    });
});
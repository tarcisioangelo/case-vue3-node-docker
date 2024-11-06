import { describe, expect, test } from '@jest/globals'

// Components
import { dateFormatSave } from '../../../../src/common/utils'

describe('Common Datas', () => {
    test('dateFormatSave function', async () => {
        const dateFormatted = await dateFormatSave('2024-11-05 10:00')

        expect(dateFormatted).toEqual(new Date(dateFormatted))
    })
})

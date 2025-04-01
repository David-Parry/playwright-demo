import { getTimeFromDateString } from './utilities';
import * as assert from "node:assert";

describe('getTimeFromDateString', function() {
    it('test_get_time_from_valid_datetime_string', function() {
        const datetime = '2023/01/01 12:34:56';
        const result = getTimeFromDateString(datetime);
        assert.strictEqual(result,'12:34:56');
    });

    it('test_get_time_from_invalid_format', function() {
        const datetime = '2023-01-01 12:34:56';
        const result = getTimeFromDateString(datetime);
        assert.strictEqual(result,'12:34:56');
    });

    it('test_get_time_from_single_digit_hour', function() {
        const datetime = '2023/01/01 09:15:30';
        const result = getTimeFromDateString(datetime);
        assert.strictEqual(result,'9:15:30');
    });
});
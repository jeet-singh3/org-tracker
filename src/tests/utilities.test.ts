import { generate_sql_statement } from '../utils/utilities'

const my_object_full = {
    name: 'jeet',
    createDate: { lt: '2020-01-01' },
    employees: { lte: '100' },
    isPublic: 'true'
};
const my_object_full_sql = 'select name, createDate, employees, isPublic from organizations where name ~ $1 and createDate < $2 and employees <= $3 and isPublic = $4 '

const my_object_name = {
    name: 'jeet'
}
const my_object_name_sql = 'select name, createDate, employees, isPublic from organizations where name ~ $1 '

const my_object_create = {
    createDate: '2020-02-02',
    employees: '100'
}
const my_object_create_sql = 'select name, createDate, employees, isPublic from organizations where createDate = $1 and employees = $2 '

const my_object_create_extra_value = {
    createDate: '2020-02-02',
    extra: '9001',
    employees: '100'
}

const my_object_full_gt = {
    name: 'jeet',
    createDate: { gt: '2020-01-01' },
    employees: { gte: '100' },
    isPublic: 'true'
};
const my_object_full_gt_sql = 'select name, createDate, employees, isPublic from organizations where name ~ $1 and createDate > $2 and employees >= $3 and isPublic = $4 '

const my_object_full_gt_extra_bad = {
    name: 'jeet',
    createDate: { gt: '2020-01-01' },
    employees: { eq: '100' },
    extra: { gt: '9001' },
    isPublic: 'true'
};
const my_object_full_gt_extra_bad_sql = 'select name, createDate, employees, isPublic from organizations where name ~ $1 and createDate > $2 and employees = $3 and isPublic = $4 '

describe('sqlStatementGenerator', () => {
    it('should return the correct sql statement for the passed in full lt queries', async () => {
        const generated_sql = await generate_sql_statement(my_object_full)
        expect.assertions(1)
        expect(generated_sql).toEqual(my_object_full_sql)
    });
    it('should return the correct sql statement for the passed in with full gt queries', async () => {
        const generated_sql = await generate_sql_statement(my_object_full_gt)
        expect.assertions(1)
        expect(generated_sql).toEqual(my_object_full_gt_sql)
    });
    it('should return the correct sql statement for the passed in half queries', async () => {
        const generated_sql = await generate_sql_statement(my_object_create)
        expect.assertions(1)
        expect(generated_sql).toEqual(my_object_create_sql)
    });
    it('should return the correct sql statement for the passed in half queries with extra', async () => {
        const generated_sql = await generate_sql_statement(my_object_create_extra_value)
        expect.assertions(1)
        expect(generated_sql).toEqual(my_object_create_sql)
    });
    it('should return the correct sql statement for the passed in one query', async () => {
        const generated_sql = await generate_sql_statement(my_object_name)
        expect.assertions(1)
        expect(generated_sql).toEqual(my_object_name_sql)
    });
    it('should return the correct sql statement for the passed in no queries', async () => {
        const generated_sql = await generate_sql_statement({})
        expect.assertions(1)
        expect(generated_sql).toEqual('select name, createDate, employees, isPublic from organizations ')
    });
    it('should return the correct sql statement for the passed in with full and bad queries', async () => {
        const generated_sql = await generate_sql_statement(my_object_full_gt_extra_bad)
        expect.assertions(1)
        expect(generated_sql).toEqual(my_object_full_gt_extra_bad_sql)
    });
})
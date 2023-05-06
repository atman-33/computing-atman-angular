describe('Jestの練習', () => {
    // 基本はit（1つのテスト）に1つのexpectを実装
    it('test1', () =>{
        const result = 1;
        const expected = 1;
        expect(result).toEqual(expected);
    });
});
const { calcularMediaAluno } = require('../../src/calcularMediaAluno');


describe('calcularMediaAluno', () => {

  test('deve lançar erro se a1 ou a2 forem undefined', () => {
    expect(() => calcularMediaAluno(undefined, 5)).toThrow('Notas a1 ou a2 não informadas');
    expect(() => calcularMediaAluno(5, undefined)).toThrow('Notas a1 ou a2 não informadas');
  });


  test('deve lançar erro se a1 ou a2 forem negativos', () => {
    expect(() => calcularMediaAluno(-1, 5)).toThrow('Notas a1 ou a2 não podem ser negativas');
    expect(() => calcularMediaAluno(5, -1)).toThrow('Notas a1 ou a2 não podem ser negativas');
  });


  test('deve calcular média base corretamente quando a3 não é informada', () => {
    const resultado = calcularMediaAluno(7, 8);
    expect(resultado).toBeCloseTo(7.6);
  });

 
  test('deve lançar erro se a3 for negativa', () => {
    expect(() => calcularMediaAluno(7, 8, -2)).toThrow('Nota a3 não pode ser negativa');
  });


  test('deve retornar a melhor média entre a1 e a3', () => {
    const resultado = calcularMediaAluno(4, 8, 9);

    expect(resultado).toBeCloseTo(8.5);
  });


  test('deve retornar a melhor média entre a2 e a3', () => {
    const resultado = calcularMediaAluno(8, 4, 9);
    
    expect(resultado).toBeCloseTo(8.5);
  });
});

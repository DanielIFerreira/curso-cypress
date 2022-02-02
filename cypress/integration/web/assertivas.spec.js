
it('Equality', () => {
    const a = 1;
    
    expect(a).to.be.eq(1);
    expect(a).not.to.be.eq(2);
    expect(a, 'Deveria ser 1').eq(1);
    expect(a).not.to.be.eq('b');
    
});

it('Truthy', () => {
    const a = true;
    const b = null;
    let c;

    expect(a).to.be.eq(true);
    expect(a).not.to.be.eq(b);
    expect(b).to.be.null;
    expect(c).to.be.eq(undefined);

});

it('Object Equality', () => {
    const obj = {
        a: 1,
        b:3
    }

    expect(obj).eq(obj);
    expect(obj).to.be.eq(obj);
    expect(obj).to.be.deep.eq({a:1, b:3});

    //Para verificar se o valor dentro do objeto é verdadeiro usar "deep"
    expect(obj).not.to.be.deep.eq({a:1, b:2});

    //Verificar se o objeto possui o valor 1 dentro dele
    expect(obj).include({a:1});

    //Posso consultar só a propriedade
    expect(obj).to.have.property('b');
    expect(obj).to.have.property('b', 3);
    expect(obj).not.to.be.empty;
});

it('Arrays', () => {
    const arr = [1, 2, 3, 10]

    expect(arr).to.have.members([1, 2, 3, 10]);
    expect(arr).to.include.members([1, 10]);
});

it('Consult String', () => {
    const num = 1
    const str = 'Curso Cypress'

    expect(num).not.to.be.empty;
    expect(str).to.be.eq('Curso Cypress');
    expect(str).to.be.have.string('Curso');
    expect(str).to.be.have.length(13);
    expect(str).to.contains('Cur');
    expect(str).to.match(/C/);
    expect(str).to.match(/^Curso/);
    expect(str).to.match(/Cypress$/);

});

it('Numbers', () => {
    const float = 5.45231

    expect(float).to.be.eq(5.45231)
    expect(float).to.be.closeTo(5.4, 0.1)
    expect(float).to.be.above(5)
});
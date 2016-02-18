describe ('Thermostat', function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it ('starts 20 degrees when created', function() {
    expect(thermostat.temperature).toBe(20);
  });

  it ('can increase temp by 1 degree', function() {
    thermostat.increaseTemp();
    expect(thermostat.temperature).toBe(21);
  });

  it ('can decrease temp by 1 degree', function() {
    thermostat.decreaseTemp();
    expect(thermostat.temperature).toBe(19);
  });

  it ('has a minimum temp of 10 degrees', function() {
    expect(thermostat.minTemp).toBe(10);
  });

  it ('cannot go below the minumum temp', function() {
    thermostat.temperature = 10
    expect(function(){thermostat.decreaseTemp()}).toThrowError('Cannot go below minimumTemp')
  })

  it ('is power saving mode when created', function() {
    expect(thermostat.isPowerSaving).toBe(true);
  })

  it ('has max temp of 25 in powersaving mode', function() {
    thermostat.powerSavingOff();
    thermostat.powerSavingOn();
    expect(thermostat.maxTemp).toBe(25);
    expect(thermostat.isPowerSaving).toBe(true);
  });

  it ('cannot exceed 25 in powersaving mode', function() {
    thermostat.temperature = 25;
    expect(function() {thermostat.increaseTemp()}).toThrowError('Cannot exceed the max temp')
  });

  it ('goes down to 25 when you click powersaving mode', function() {
    thermostat.temperature = 28;
    thermostat.powerSavingOn();
    expect(thermostat.temperature).toBe(25)
  });

  it ('has max temp of 32 when powersaving mode is off', function() {
    thermostat.powerSavingOff();
    expect(thermostat.maxTemp).toBe(32)
    expect(thermostat.isPowerSaving).toBe(false);
  });

  it ('cannot exceed 32 in off-powersaving mode', function() {
    thermostat.temperature = 32;
    expect(function() {thermostat.increaseTemp()}).toThrowError('Cannot exceed the max temp')
  })

  it ('resets to default temp of 20', function() {
    thermostat.temperature = 10;
    thermostat.reset();
    expect(thermostat.temperature).toBe(20);
  });

  it ('displays energy usage colors', function() {
    thermostat.temperature = 16;
    expect(thermostat.energyUsage()).toBe('Green');
    thermostat.temperature = 22;
    expect(thermostat.energyUsage()).toBe('Yellow');
    thermostat.temperature = 25;
    expect(thermostat.energyUsage()).toBe('Red');
  });

});

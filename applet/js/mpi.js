// Correct information such as addresses and other information on the patient profile
async function correctEntityInformation(entity) {
    // Update the address - Correcting any linked addresses to the strong addresses
    // TODO: 
    if (entity.address) {
        var addressList = [];
        var promises = Object.keys(entity.address).map(async function (k) {
            try {
                var addr = entity.address[k];
                if (!Array.isArray(addr))
                    addr = [addr];

                var intlPromises = addr.map(async function (addrItem) {
                    addrItem.use = addrItem.useModel.id;
                    addrItem.component = addrItem.component || {};
                    delete (addrItem.useModel);
                    addressList.push(addrItem);
                });
                await Promise.all(intlPromises);
            }
            catch (e) {
            }
        });
        await Promise.all(promises);
        entity.address = { "$other": addressList };
    }
    if (entity.name) {
        var nameList = [];
        Object.keys(entity.name).forEach(function (k) {

            var name = entity.name[k];
            if (!Array.isArray(name))
                name = [name];

            name.forEach(function (nameItem) {
                nameItem.use = nameItem.useModel.id;
                delete (nameItem.useModel);
                nameList.push(nameItem);
            })

        });
        entity.name = { "$other": nameList };
    }

}

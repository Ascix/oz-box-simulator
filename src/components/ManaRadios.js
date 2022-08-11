
function ManaRadios() {
    return (
        <div className="manaRadios">
            <input type="radio" id="mana" name="mana_or_none" value="Mana"/>
            <label for="mana">Mana</label>
            <input type="radio" id="noMana" name="mana_or_none" value="No Mana"/>
            <label for="noMana">No Mana</label>
        </div>
    )
}

export default ManaRadios
$(document).ready(function(){
    var form = (function(){
        var root = $('#employee'),
            skills = root.find('.skills'),
            data = {};
        // get data from ajax or somewhere
        var getUserData = function() {
            data = {
                username: 'John Smith',
                country: 'Portland, Oregon, USA',
                language: 'English',
                skills: {
                    "php": 1,
                    "ruby": 1,
                    "javascript": 2,
                    "actionscript": 3
                },
                skillsCoord: {
                    1: "strong",
                    2: "medium",
                    3: "low"
                }
            };
        };
        var deleteSkill = function(elem){
            var skillName = $.trim(elem.parent().data('tag'));
            elem.parent().remove();
            if (skillName in data.skills) {
                delete data.skills[skillName];
                addDomSkills();
            }
            // here could be ajax request
        };
        var addSkill = function(elem){
            var skillName, skillPower,
                parentBlock = elem.closest('.editBlock');
                skillName = $.trim(parentBlock.find('input').val().toLowerCase()),
                skillPower = $.trim(parentBlock.find('select').val());
            data.skills[skillName] = skillPower;
            if (skillName!== '')
                addDomSkills();
        };
        var addDomSkills = function(){
            var skillsArray = sortSkills();
            var newList = _.template("<% _.each(skillsData, function(item) { %> <li data-tag='<%= item.name %>' class='skill-item skill-<%= item.power %>'><%= item.name %><del class='skill-delete'></del></li> <% }); %>");
            skills.empty();
            skills.html(newList({skillsData: skillsArray}));
        };
        // sort skills by power
        var sortSkills = function(){
            var addArray = [], tempElem, i;
            for (i in data.skills) {
                tempElem = {name: i.toLowerCase(), power: data.skills[i]};
                addArray.push(tempElem);
            }
            function comparePower(powerA, powerB) {
                return powerA.power - powerB.power;
            }
            addArray.sort(comparePower);
            for (var j = 0; j < addArray.length; j++) {
                addArray[j].power = data.skillsCoord[addArray[j].power];
            }
            return addArray;
        };
        // apply changes
        var applyChanges = function(elem){
            var field = elem.parent().find('input'),
                value = $.trim(field.val());
            if (value !== '') {
                elem.parent().prev('.editTrigger').text(value);
                data[field] = field.val();
            }
            closeEditField(elem);
            // here could be ajax request
        };
        // show input to input
        var showEditField = function(elem){
            var editBlock = elem.parent().children('.editBlock');
            root.find('.editBlock').addClass('hidden-field');
            if (!editBlock.hasClass('skills-addition'))
                editBlock.find('input').val(elem.text());
            editBlock.removeClass('hidden-field');
            editBlock.find('input').focus();
        };
        //close edit block
        var closeEditField = function(elem) {
            elem.closest('.editBlock').addClass('hidden-field');
        };
        var removeChanges = function(elem){
            closeEditField();
        };
        var printPage = function(){
            window.print();
        };
        return {
            init: function() {
                getUserData();
                // show edit input
                root.find('.editTrigger').on('click', function(){
                    showEditField($(this));
                });
                // apply all changes
                root.find('.ready').on('click', function(){
                    applyChanges($(this));
                });
                // remove changes
                root.find('.remove').on('click', function(){
                    closeEditField($(this));
                });
                // print page
                $('.print').on('click', function(){
                    printPage();
                });
                // add skills
                $('.skill-ready').on('click', function(){
                    addSkill($(this));
                });
                // skill delete
                $('body').on({
                    click: function(){
                        deleteSkill($(this));
                    }
                }, '.skill-delete');
            }
        }
    })();
    form.init();
});
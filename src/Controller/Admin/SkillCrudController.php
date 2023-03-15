<?php

namespace App\Controller\Admin;

use App\Entity\Skill;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class SkillCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Skill::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Skill')
            ->setEntityLabelInPlural('Skills')
            ->setPageTitle('index', '%entity_label_plural% listing')
            ->setPageTitle('detail', fn(Skill $skill) => $skill->getName())
            ->setPageTitle('edit', fn(Skill $skill) => sprintf('Editing <b>%s</b>', $skill->getName()))
            ->setSearchFields(['name'])
            ->setDefaultSort(['id' => 'DESC']);
    }

    public function configureFields(string $pageName): iterable
    {
        yield TextField::new('name');
        yield ChoiceField::new('type')
            ->renderExpanded()
            ->setChoices([
            'Soft Skill' => 'soft',
            'Programmer Skill' => 'warning'
        ]);
        yield ImageField::new('icon')
            ->setBasePath('skills/')
            ->setUploadDir('public/skills/');

    }
}
